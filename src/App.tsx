import React from 'react';
import Routes from './Routes';
import Notification from './components/Notification';
import './App.scss';


export const NotificationContext = React.createContext((notification: Notif) => {
    console.log(notification);
});

interface Notif {
    title: string;
    message: string;
    type: string;
    action?: () => void;
}

const App = () => {
    const notifs: Notif[] = [];
    const [notifications, setNotifications] = React.useState<Notif[]>([]);

    const pushNotification = (notif: Notif) => {
        notifs.push(notif);
        setNotifications([...notifs]);
        setTimeout(() => {
            notifs.splice(notifs.indexOf(notif), 1);
            setNotifications([...notifs]);
        }, 3000);
    };

    return (
        <NotificationContext.Provider value={pushNotification}>
            <div className={'background'}></div>
            <div className={'container'}>
                <Routes />
                {notifications.map((notification, index) => (
                    <Notification
                        title={notification.title}
                        message={notification.message}
                        type={notification.type}
                        action={notification.action}
                        key={index}
                    />
                ))}
            </div>
        </NotificationContext.Provider>
    );
};

export default App;