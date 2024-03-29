import { TextField, Button } from "@mui/material";
import { useState } from "react";

const GroupCreationForm = ({ createCallback, declineCallback, errorCallback }) => {
    const [group, setGroup] = useState({
        name: "",
    });

    const create = () => {
        if (!group.name) {
            errorCallback("Обязательное поле");
            return;
        } else if (group.name.length > 15) {
            errorCallback("Длина не более 15 символов");
            return;
        } else if (!/^[А-ЯA-Z]+-\d+$/i.test(group.name)) {
            errorCallback("Неверный формат (Группа-номер)");
            return;
        }

        createCallback(group);
    };

    return (
        <>
            <TextField
                fullWidth
                variant="outlined"
                label="Название группы"
                placeholder="Имя-Номер"
                id="groupName"
                name="groupName"
                value={group.name}
                onChange={(e) => setGroup({ ...group, name: e.target.value })}
            />
            <Button variant="outlined" onClick={create}>
                Создать
            </Button>
            <Button
                variant="outlined"
                color="error"
                onClick={() => {
                    setGroup({ ...group, name: "" });
                    declineCallback();
                }}
            >
                Отмена
            </Button>
        </>
    );
};

export default GroupCreationForm;
