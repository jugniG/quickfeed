import { listWebsites, addWebsite, deleteWebsite } from './websites'
import { listFeedbacks, updateFeedbackStatus } from './feedbacks'
import { getSubscription, getPlans, startTrial, createCheckout, cancelSubscription, resumeSubscription, changePlan, getUpdatePaymentUrl } from './billing'

export default {
  websites: {
    list: listWebsites,
    add: addWebsite,
    delete: deleteWebsite,
  },
  feedbacks: {
    list: listFeedbacks,
    updateStatus: updateFeedbackStatus,
  },
  billing: {
    getSubscription,
    getPlans,
    startTrial,
    createCheckout,
    cancelSubscription,
    resumeSubscription,
    changePlan,
    getUpdatePaymentUrl,
  },
}
