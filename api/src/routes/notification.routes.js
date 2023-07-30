import express from 'express'
import { getUnreadNotifications, markNotificationsAsRead } from '../controllers/notification.controller.js';

const router = express.Router()

router.get('/notifications', authorize(['admin', 'user']), getUnreadNotifications);
router.post('/notifications/mark-read', authorize(['admin', 'user']), markNotificationsAsRead);

export default router