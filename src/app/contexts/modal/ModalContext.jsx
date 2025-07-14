import { createContext, useContext, useState } from "react";
import GlobalModal from '../../../components/atoms/GlobalModal';

const ModalContext = createContext();

const ModalProvider = ({children}) => {
    const [modal, setModal] = useState(null);

    const showModal = ({title, message, icon, onClose, color}) => {
        setModal({ title, message, icon, onClose, color });
    };

    const closeModal = () => {
        if(modal?.onClose) modal.onClose();
        setModal(null);        
    }

    return(
        <ModalContext.Provider value={{ showModal, closeModal }}>
            {children}
            {modal && (
                <GlobalModal
                    isOpen={modal}
                    title={modal.title}
                    message={modal.message}
                    icon={modal.icon}
                    onClose={closeModal}
                    color={modal.color}
                />
            )}
        </ModalContext.Provider>
    )
}

export const useModal = () => useContext(ModalContext);
export default ModalProvider;