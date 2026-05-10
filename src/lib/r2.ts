import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

const accountId  = process.env.CF_R2_ACCOUNT_ID!
const bucketName = process.env.CF_R2_BUCKET_NAME!
const publicUrl  = process.env.CF_R2_PUBLIC_URL!

export const r2 = new S3Client({
  region: 'auto',
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId:     process.env.CF_R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CF_R2_SECRET_ACCESS_KEY!,
  },
})

export async function uploadImageToR2(
  buffer: Buffer,
  key: string,
  contentType: string,
): Promise<string> {
  await r2.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    }),
  )
  return `${publicUrl}/${key}`
}
