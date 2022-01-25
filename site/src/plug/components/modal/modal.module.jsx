import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

const noop = () => {};

export default function Modal({ open, title, children, onClose = noop }) {
    return (
        <ReactModal isOpen={open} onRequestClose={onClose} contentLabel={title}>
            {children}
        </ReactModal>
    );
};