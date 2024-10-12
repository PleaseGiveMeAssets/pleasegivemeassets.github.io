import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { toast } from "@steveyuowo/vue-hot-toast";

const firebaseConfig = {
  apiKey: "AIzaSyCuNHDltL9pp8Tt0U4ZAsDZ8kk29bAg7B0",
  authDomain: "pleasegivemeassets.firebaseapp.com",
  projectId: "pleasegivemeassets",
  storageBucket: "pleasegivemeassets.appspot.com",
  messagingSenderId: "728160856151",
  appId: "1:728160856151:web:243a41a1ee061743bc9b12",
  measurementId: "G-BMVDRVX4QM",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestForToken = async () => {
  try {
    const currentToken = await getToken(messaging, {
      vapidKey:
        "BNCnOqfdBm_KSYG37G7TRtXeXU3TqZybnY9so-jIq3VIf37dVJRJrkveugdXGE8AVnsWTE3wVZ1Ic3Dzcoc8KPM",
    });
    if (currentToken) {
      alert(`발급 성공 : ${currentToken}`);
      console.log("current token for client: ", currentToken);
      // 여기서 토큰을 서버로 전송하는 로직을 추가할 수 있습니다.
      return currentToken;
    } else {
      alert("발급 실패");
      console.log(
        "No registration token available. Request permission to generate one.",
      );
      return null;
    }
  } catch (err) {
    console.error("토큰 검색 중 오류 발생:", err);
    return null;
  }
};

// 포그라운드 메시지 처리
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("Received foreground message:", payload);

      if (document.visibilityState === "visible") {
        const notificationTitle = payload.notification?.title || "제목없음";
        const notificationOptions = {
          body: payload.notification?.body,
        };

        // 알림 표시
        new Notification(notificationTitle, notificationOptions);
        toast.success(
          notificationOptions?.body ?? "새로운 메시지가 도착했습니다",
        );
      }

      resolve(payload);
    });
  });

export { app, messaging };
