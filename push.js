var webPush = require('web-push');

const vapidKeys = {
   "publicKey": "BMrpgo8c3OxavVPJRu7ecgbraVqC2HwxM7CWqSBxpQhKylMnAGKtNRIGZxKW6wcT5M-A3ag03TKHb32mAJ-t8g4",
   "privateKey": "JUw-nMNv-bsZdG4gH53KOAaB9hUC-yIurcXr5Gupvjg"
};


webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/c6XCasz-XSM:APA91bHnmvnBy8XRsC6MJHEF80WXKZhWjzgYS0tUjNLXsf0LIUfIqzdQJxu65GdaRzOxDnTWvfklw4ERSgPLgRwkXL3nngywKxNeY38cHFYaZCj4g3o1YUU1vzZwnWLwJcl4H00h8dO5",
   "keys": {
       "p256dh": "BLF4FMbd62nfNgm7oa61tX1B0TK6AcCRlZXQ3yse1qsTDQsAaXiDEejMcFkpR6o+TtXtI5toVhDMCD5Ey4sh4do=",
       "auth": "1Q8Hrm5cy0hWPiyTZFXBdA=="
   }
};
var payload = 'Jangan lupa nantikan berita terbaru mengenai club bola kalian!';

var options = {
   gcmAPIKey: '407548188376',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);
