# Vera AI Monorepo

## Repository Structure

```
vera-ai-mvp-mono/
├── apps/
│   ├── frontend/        # Main tenant dashboard (TanStack Start)
│   ├── superadmin/      # Superadmin panel (TanStack Start)
│   └── backend/         # Python AWS Lambda functions
├── packages/
│   ├── database/        # Shared Prisma schema & client
│   └── ui/              # Shared UI components
├── terraform/           # Multi-environment IaC
└── scripts/             # Deployment scripts
```

## Tech Stack

### Frontend Apps (frontend & superadmin)
- **Framework**: TanStack Start 1.132 (SSR, file-based routing)
- **Router**: `@tanstack/react-router` (type-safe routing)
- **State**: `@tanstack/react-query` 5.96 (server state management)
- **API Layer**: oRPC 1.14 (type-safe RPC framework)
- **UI**: HeroUI 2.8 + TailwindCSS 4.1
- **Auth**: Better Auth 1.5 (magic links via AWS SES)
- **Database**: PostgreSQL via Prisma 7.4 (`@repo/database` package)
- **Forms**: React Hook Form + Zod
- **Analytics**: Mixpanel (server + browser SDKs)
- **AWS SDKs**: S3, DynamoDB, SES, Bedrock
- **Runtime**: React 19, TypeScript 5.7, Node 18+

### Backend (Python Lambda)
- **Language**: Python 3.12
- **Runtime**: AWS Lambda
- **Services**: S3, SQS, DynamoDB, Bedrock, SES

### Infrastructure
- **Cloud**: AWS (multi-region: dev=ap-south-2, prod=ap-south-1)
- **IaC**: Terraform with environment isolation
- **Database**: PostgreSQL (AWS RDS)
- **Storage**: S3 (recordings, SOPs)
- **Queues**: SQS with DLQs
- **Secrets**: AWS Secrets Manager

## Developer Commands

### Root-level (Turborepo)
```bash
npm run dev           # Start frontend dev server (port 5173)
npm run dev:s         # Start superadmin dev server (port 5174)
npm run build         # Build all apps
npm run lint          # Lint all workspaces
npm run check-types   # TypeCheck all workspaces
npm run db:generate   # Regenerate Prisma client
npm run db:migrate    # Run database migrations
```

### Backend (Python Lambda)
```bash
cd apps/backend
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
```

## CRITICAL: API Development Rules

### ALWAYS Use oRPC for New API Endpoints

**DO NOT create new REST API routes in `src/routes/api/` unless absolutely necessary.**

Use the **oRPC framework** at `apps/frontend/src/orpc/`:

#### Step 1: Create a Router File

```typescript
// src/orpc/routers/myfeature.ts
import { z } from 'zod'
import { prisma } from '@repo/database/client'
import { authedProcedure, adminProcedure } from '../middleware'
import { ORPCError } from '@orpc/server'
import { hasAdminAccess } from '../helpers'

export const myFeatureRouter = {
  getData: authedProcedure
    .input(z.object({
      id: z.number(),
      tenantId: z.number()
    }))
    .handler(async ({ input, context }) => {
      const { user } = context.auth
      if (!hasAdminAccess(user, input.tenantId)) {
        throw new ORPCError('FORBIDDEN', { message: 'No access' })
      }
      const data = await prisma.myTable.findUnique({ where: { id: input.id } })
      if (!data) throw new ORPCError('NOT_FOUND')
      return data
    }),

  updateData: adminProcedure
    .input(z.object({ id: z.number(), tenantId: z.number(), name: z.string().min(1) }))
    .handler(async ({ input, context }) => {
      return await prisma.myTable.update({
        where: { id: input.id },
        data: { name: input.name }
      })
    })
}
```

#### Step 2: Register in Main Router

```typescript
// src/orpc/router.ts
import { myFeatureRouter } from './routers/myfeature'

const router = {
  settings: settingsRouter,
  deletion: deletionRouter,
  myFeature: myFeatureRouter,
}
```

#### Step 3: Use in React Components

```typescript
import { orpc } from '@/orpc/client'

function MyComponent() {
  const { data, isLoading } = orpc.myFeature.getData.useQuery({
    input: { id: 123, tenantId: 456 }
  })

  const mutation = orpc.myFeature.updateData.useMutation({
    onSuccess: () => { /* invalidate, toast, etc. */ }
  })

  return <div>{data?.name}</div>
}
```

#### When REST Routes Are Acceptable
- External webhooks (e.g., `/api/auth/$` for Better Auth)
- File uploads requiring multipart/form-data
- Third-party integrations that cannot use RPC
- The oRPC handler itself (`/api/rpc/$`)

### oRPC Middleware Reference
- **`base`**: Error handling wrapper (wraps unknown errors in `INTERNAL_SERVER_ERROR`)
- **`authedProcedure`**: Requires logged-in user, adds `context.auth.user`
- **`adminProcedure`**: Requires user with `role: 'admin'`

### Error Handling
```typescript
import { ORPCError } from '@orpc/server'

throw new ORPCError('BAD_REQUEST', { message: 'Invalid input' })
throw new ORPCError('UNAUTHORIZED', { message: 'Not logged in' })
throw new ORPCError('FORBIDDEN', { message: 'Admin access required' })
throw new ORPCError('NOT_FOUND', { message: 'Resource not found' })
throw new ORPCError('CONFLICT', { message: 'Duplicate resource' })
throw new ORPCError('INTERNAL_SERVER_ERROR', { message: 'Unexpected error' })
```

## Authentication & Authorization

### Client-Side
```typescript
import { authClient } from '@/lib/auth-client'

const { data: session, isPending } = authClient.useSession()
// session.user.id, session.user.name, session.user.role, session.user.tenant.id
```

### Server-Side (in API routes)
```typescript
import { getSession } from '@/lib/auth-server'

const session = await getSession()
if (!session?.user) { /* 401 */ }
```

### Authorization Helpers
```typescript
import { hasAdminAccess } from '@/orpc/helpers'

if (!hasAdminAccess(user, tenantId)) {
  throw new ORPCError('FORBIDDEN')
}
```

## Database (Prisma)

- **Schema**: `packages/database/prisma/schema.prisma`
- **Import**: `import { prisma } from '@repo/database/client'`

### After Schema Changes
1. Edit `packages/database/prisma/schema.prisma`
2. Run `npm run db:generate` (just regenerates client, no migration)
3. Restart dev server

### CRITICAL Database Rules
- **NEVER create migration files** - don't create any files in `prisma/migrations/` directory
- **NEVER run `npm run db:migrate`** without explicitly asking the user first
- **ALWAYS ask before running migrations** - migrations modify the actual database and can't be easily reversed
- Only modify `schema.prisma` - let the user handle migrations themselves
- `npm run db:generate` is safe (only regenerates TypeScript types, doesn't touch database)

## Validation (Zod)

- All oRPC inputs MUST have Zod schemas via `.input(z.object({...}))`
- Use `zodResolver` with React Hook Form for client forms
- Reuse schemas between client and server when possible
- for any new client side input, forms use useform()  maybe with its zod resolver

## Analytics (Mixpanel)

### Server-Side
```typescript
import { mixpanelServer } from '@/lib/mixpanel-server'
mixpanelServer.track('event_name', userId, { tenant_id: tenantId })
```

### Client-Side
```typescript
import { mixpanel } from '@/lib/mixpanel'
mixpanel.track('button_clicked', { button_name: 'export' })
```

### Strict Tracking Policy
- NO tracking on every keystroke — use debouncing
- Track `input_changed` only on successful DB submission (diff old vs new state)
- Debounce search inputs (500ms)
- Track user actions, not system events

## Audit Logging

```typescript
import { logTenantAudit } from '@/lib/audit'

await logTenantAudit({
  tenantId, actorId: String(userId), actorName, actorRole: 'admin',
  action: 'user_deleted', targetType: 'user', targetId: deletedUserId,
  details: { reason: 'GDPR request' }
})
```

Log: user changes, settings updates, deletion requests, data exports, permission changes.

## Route Structure (TanStack Router)

```
src/routes/
├── index.tsx              → /
├── _protected/            → Requires auth
│   └── dashboard/
│       ├── index.tsx      → /dashboard
│       └── settings.tsx   → /dashboard/settings
└── api/
    └── rpc.$.ts           → /api/rpc/* (oRPC handler)
```

## Frontend Project Structure

```
apps/frontend/src/
├── routes/              # TanStack Router file-based routes
├── orpc/                # oRPC API layer
│   ├── router.ts        # Main router registry
│   ├── middleware.ts    # Auth middleware
│   ├── client.ts        # Client-side oRPC client
│   ├── helpers.ts       # Shared helpers
│   └── routers/         # Feature-specific routers
├── lib/                 # Utilities, config, schemas
│   ├── auth-client.ts   # Better Auth client
│   ├── auth-server.ts   # Server-side auth
│   ├── mixpanel.ts      # Client-side analytics
│   ├── mixpanel-server.ts # Server-side analytics
│   ├── audit.ts         # Audit logging helper
│   └── env.ts           # Environment variables
├── components/          # React components
└── hooks/               # Custom React hooks
```

## Infrastructure

| Environment | Region | Purpose |
|-------------|--------|---------|
| dev | ap-south-2 | Development/testing |
| prod | ap-south-1 | Production |

### Deployment
```bash
./scripts/push-frontend.sh <env>   # Deploy frontend
./scripts/push-superadmin.sh <env>  # Deploy superadmin
TF_ENV=<env> ./scripts/tf.sh <cmd>  # Terraform wrapper
./scripts/start-tunnel.sh <env>     # SSM tunnel to RDS
```

### Key AWS Resources
- **RDS PostgreSQL**: Main database
- **S3**: Recordings, SOP files
- **SQS**: Async processing queues (download, analytics)
- **Lambda**: Python microservices (transcription, analysis)
- **API Gateway**: Webhook endpoints
- **Secrets Manager**: Credentials
- **DynamoDB**: Unstructured analytics data

## Verification Flow (Before Commit)

**ALWAYS run in this order**:
1. `npm run lint:fix`
2. `npm run typecheck` (CRITICAL — catches type errors)

Never commit without passing typecheck.
