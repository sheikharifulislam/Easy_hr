import { Button } from "@nextui-org/react";
import { useContext } from "react";
import { FaMailBulk } from "react-icons/fa";
import { FaFileCsv, FaPlus } from "react-icons/fa6";
import { TableContext } from "../../context/TableProvider";

const Header = ({ handleOpen }) => {
    const { selectedEmails } = useContext(TableContext);
    return (
        <div className="my-10 text-right">
            <Button className="mr-3" endContent={<FaPlus />} onClick={() => handleOpen("createEmployee")}>
                Add Employee
            </Button>
            <Button className="mr-3" endContent={<FaFileCsv />} onClick={() => handleOpen("uploadCsv")}>
                Upload CSV
            </Button>
            {selectedEmails.size > 0 && (
                <Button className="mr-3" endContent={<FaMailBulk />} onClick={() => handleOpen("sendEmail")}>
                    Send Email
                </Button>
            )}
        </div>
    );
};

export default Header;
