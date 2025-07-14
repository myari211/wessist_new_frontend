import { useEffect } from 'react';
import echo from '../../libs/echo';
import CustomNotification from 'components/atoms/CustomNotification';
import { toast } from 'sonner';

const NotificationListener = ({ userId }) => {
    useEffect(() => {
        if(!userId) return;

        const channel = echo.private(`user.${userId}`);

        channel.listen('.notification.created', (e) => {
            toast.custom((t) => (
                <CustomNotification 
                    toastId={t}
                    title={e.notification?.title || "Notifikasi"}
                    message={e.notification?.message || "Pesan Baru Diterima"}
                />
            ))
        });

        return () => {
            echo.leave(`private-user.${userId}`);
        }
    }, [userId]);

    return null
}

export default NotificationListener;