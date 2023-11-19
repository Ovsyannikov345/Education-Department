import React, { useState } from "react";
import { Box, Container, FormControl, FormGroup, Typography, Button, Grid } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Textarea } from "@mui/joy";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import "react-datepicker/dist/react-datepicker.css";
import SelectOrganiz from "../modal/SelectOrganiz";
import InvitePersonsTable from "../modal/tables/InvitePersonsTable";

function AddEvent() {
	const [dischipl, setDischipl] = useState("");
	const [additional, setAdditional] = useState("");
	const [subdivision, setSubdivision] = useState("");
	const [eventName, setEventName] = useState("");
	const [eventGoal, setEventGoal] = useState("");
	const [direction, setDirection] = useState("");

	const [invitesTable, setInvitesTavle] = useState(false);
	const [organizeModal, setOrganizeModal] = useState(false);
	const [dateLine, setDateLine] = useState(null);


	const addEvent = () => {
		const event = {
			name: eventName,
			gole: eventGoal,
			dischipl: dischipl,
			additional: additional,
			dateLine: dateLine,
			// invited: selectedRows,
			// organize: organize,
		}

		console.log(event)
	}

	const handleDateChange = (date) => {
		setDateLine(date);
	};

	//return <h1>asd</h1>

	return (
		<Container sx={{ display: "flex" }}>
			<Box sx={{ mt: 2 }}>
				<Typography variant="h6">Добавить мероприятие</Typography>
				<Grid container spacing={2}>
					<Grid item>
						<FormControl sx={{ width: 500, mt: 2 }}>
							<InputLabel id="dischipl-label">Подразделение</InputLabel>
							<Select
								labelId="dischipl-label"
								id="dischipl-select"
								value={dischipl}
								label="Подразделение"
								onChange={(event) => setDischipl(event.target.value)}
							>
								<MenuItem value={1}>Деканат</MenuItem>
								<MenuItem value={10}>ОВРМ</MenuItem>
								<MenuItem value={20}>СППС</MenuItem>
								<MenuItem value={31}>Музей</MenuItem>
								<MenuItem value={32}>Спортклуб</MenuItem>
								<MenuItem value={33}>Педагоги</MenuItem>
								<MenuItem value={34}>Организаторы</MenuItem>
							</Select>
						</FormControl>
					</Grid>
					{dischipl === 1 && (
						<Grid item >
							<FormControl sx={{ mt: 2, width: 300 }}>
								<InputLabel id="additional-select-label">Факультет</InputLabel>
								<Select
									labelId="additional-select-label"
									id="additional-select"
									value={additional}
									label="Факультет"
									onChange={(event) => setAdditional(event.target.value)}
								>
									<MenuItem value={4}>ИЭФ</MenuItem>
									<MenuItem value={5}>Электротех</MenuItem>
									<MenuItem value={6}>Экономический</MenuItem>
								</Select>
							</FormControl>
						</Grid>
					)}
				</Grid>
				<Grid container spacing={2}>
					<Grid item>
						<FormControl sx={{ width: 500, mt: 2 }}>
							<InputLabel id="subdivision-label">
								Направление подготовки
							</InputLabel>
							<Select
								labelId="subdivision-label"
								id="subdivision-select"
								value={subdivision}
								label="Направление подготовки"
								onChange={(event) => setSubdivision(event.target.value)}
							>
								<MenuItem value={1}>Мероприятия по реализации основных составляющих воспитания</MenuItem>
								<MenuItem value={2}>Граждансткое воспитание</MenuItem>
								<MenuItem value={3}>Работа с общественными организациями и молодежным активом</MenuItem>
							</Select>
						</FormControl>
					</Grid>
					<Grid item>
						{subdivision === 1 && (
							<FormGroup>
								<FormControl sx={{ mt: 2, width: 300 }}>
									<InputLabel id="additional-select-label">Напрвление</InputLabel>
									<Select
										labelId="additional-select-label"
										id="additional-select"
										value={direction}
										label="Направление"
										onChange={(event) => setDirection(event.target.value)}
									>
										<MenuItem value={4}>идиологическое воспитание</MenuItem>
										<MenuItem value={5}>граждансткое и патриотическое воспитание</MenuItem>
										<MenuItem value={6}>духовно-нравственное воспитание</MenuItem>
										<MenuItem value={6}>эстетическое воспитание</MenuItem>
										<MenuItem value={6}>воспитание физической культуры</MenuItem>
										<MenuItem value={6}>формирование навыков здорового образа жизни</MenuItem>
									</Select>
								</FormControl>
							</FormGroup>
						)}
					</Grid>
				</Grid>
				<FormGroup sx={{ width: 500 }}>
					<Textarea
						sx={{ mt: 2 }}
						placeholder="Название мероприятия"
						id="event_name"
						value={eventName}
						onChange={(event) => setEventName(event.target.value)}
						size="lg"
					/>
					<Textarea
						sx={{ mt: 2 }}
						placeholder="Цель мероприятия"
						id="event_goal"
						value={eventGoal}
						size="lg"
						onChange={(e) => setEventGoal(e.target.value)}
					/>
					<Button
						sx={{ mt: 2 }}
						variant="outlined"
						onClick={() => setOrganizeModal(true)}
					>
						Добавить организаторов
					</Button>
					<Button
						sx={{ mt: 2 }}
						variant="outlined"
						onClick={() => setInvitesTavle(true)}
					>
						Добавить приглашенных
					</Button>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DatePicker
							sx={{ mt: 2 }}
							value={dateLine}
							onChange={(newValue) => handleDateChange(newValue)}
							label="Дата проведения"
						/>
					</LocalizationProvider>
					<Button sx={{ mt: 2 }} onClick={addEvent} variant="outlined">
						Добавить мероприятие
					</Button>
				</FormGroup>
			</Box>
			<SelectOrganiz show={organizeModal} hide={() => setOrganizeModal(false)} />
			{/* <InvitePersonsTable show={invitesTable} hide={() => setInvitesTavle(false)}/> */}
		</Container >
	);
}

export default AddEvent;