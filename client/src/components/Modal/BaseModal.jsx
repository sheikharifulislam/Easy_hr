import { Modal, ModalBody, ModalContent } from "@nextui-org/react";
import PropTypes from "prop-types";
import CreateEmployee from "./CreateEmployee";
import SendEmail from "./SendEmail";
import UploadCsv from "./UploadCsv";

const BaseModal = ({ modalName, isOpen, onClose }) => {
    const CurrentModal = {
        createEmployee: CreateEmployee,
        uploadCsv: UploadCsv,
        sendEmail: SendEmail,
    }[modalName];
    return (
        <Modal size={"md"} isOpen={isOpen} onClose={onClose}>
            <ModalContent className="py-10">
                {() => (
                    <>
                        <ModalBody>
                            <CurrentModal onClose={onClose} />
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

BaseModal.propTypes = {
    modalName: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default BaseModal;
