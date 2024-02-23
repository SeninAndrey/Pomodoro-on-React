export function notifyMe(notifyText: string) {
    // const sound = new Audio(tone);
    
        // Проверка поддержки браузером уведомлений
        if (!("Notification" in window)) {
            alert("This browser does not support desktop notification");
        }
        
        // Проверка разрешения на отправку уведомлений
        else if (Notification.permission === "granted") {
            // Если разрешено, то создаём уведомление
            let notification = new Notification(notifyText);
            // sound.play();
        }
      
        // В противном случае, запрашиваем разрешение
        else if (Notification.permission !== "denied") {
            Notification.requestPermission(function (permission) {
                // Если пользователь разрешил, то создаём уведомление
                if (permission === "granted") {
                let notification = new Notification(notifyText);
                }
            });
        }
    }