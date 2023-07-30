// controllers/notification.controller.js
import Notification from '../models/notification.model.js';

export const getUnreadNotifications = async (req, res) => {
  try {
    const { userId } = req.user;
    const notifications = await Notification.find({ recipientId: userId, read: false });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notifications.' });
  }
};

// controllers/notification.controller.js
export const markNotificationsAsRead = async (req, res) => {
    try {
      const { userId } = req.user;
      await Notification.updateMany({ recipientId: userId, read: false }, { read: true });
      res.status(200).json({ message: 'Notifications marked as read.' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to mark notifications as read.' });
    }
  };
  