import ReactModal from 'react-modal';

const noop = () => { };

export default function Modal({ open, title, children, onClose = noop }) {
    return (
        <ReactModal isOpen={open} onRequestClose={onClose} contentLabel={title} ariaHideApp={false}>
            {children}
        </ReactModal>
    );
};