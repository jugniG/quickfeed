import { listWebsites, addWebsite, deleteWebsite } from './websites'
import { listFeedbacks, updateFeedbackStatus } from './feedbacks'

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
}
