import React, { useState, useEffect } from "react";
import { Notifications } from "@material-ui/icons";
import { Badge } from "@material-ui/core";
import { realtime } from "../shared/firebase";
import { useSelector } from "react-redux";

const NotiBadge = (props) => {
	const { onClickBadge } = props;
	const [isRead, setIsRead] = useState(true);
	const userId = useSelector((state) => state.user.user.uid);

	const notiCheck = () => {
		const notiDB = realtime.ref(`noti/${userId}`);
		notiDB.update({ read: true });
		onClickBadge();
	};

	useEffect(() => {
		const notiDB = realtime.ref(`noti/${userId}`);
		notiDB.on("value", (snapshot) => {
			console.log(snapshot.val());
			setIsRead(snapshot.val().read);
		});
		
		return () => notiDB.off();
	}, []);

	return (
		<>
			<Badge
				invisible={isRead}
				color="secondary"
				onClick={notiCheck}
				variant="dot"
			>
				<Notifications />
			</Badge>
		</>
	);
};

NotiBadge.defaultProps = {
	onClickBadge: () => {},
};

export default NotiBadge;
