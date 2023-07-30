import express from 'express'
import { getUnreadNotifications, markNotificationsAsRead } from '../controllers/notification.controller.js';
import { authorize } from '../middlewares/authorize.js';

const router = express.Router()

router.get('', authorize(['admin', 'user']), getUnreadNotifications);
router.post('/mark-read', authorize(['admin', 'user']), markNotificationsAsRead);

export default router