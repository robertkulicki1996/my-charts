import { noop, isUndefined } from 'lodash';
import { toast } from 'react-toastify';

class NotificationService {
  isHTMLsupported = false;

  constructor() {
    if (!isUndefined(window.Notification)) {
      this.isHTMLsupported = true;
      this.enableDesktop();
    }
  }

  enableDesktop() {
    if (this.isHTMLsupported) {
      Notification.requestPermission();
    }
  }

  emitNotification(message, callback = noop, type = 'default') {
    let toastFn = toast;
    if (typeof toast[type] === 'function') {
      toastFn = toast[type];
    }

    return toastFn(message, {
      onClose: callback,
      position: 'top-right',
      type,
      autoClose: 5000,
      hideProgressBar: true,
      newestOnTop: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
  }

  notify(message, callback) {
    this.emitNotification(message, callback);
  }

  success(message, callback) {
    this.emitNotification(message, callback, 'success');
  }

  info(message, callback) {
    this.emitNotification(message, callback, 'info');
  }

  warn(message, callback) {
    this.emitNotification(message, callback, 'warn');
  }

  error(message, callback) {
    this.emitNotification(message, callback, 'error');
  }
}

const serviceInstance = new NotificationService();
window.notifs = serviceInstance;

export default serviceInstance;
