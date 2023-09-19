interface RoomProps {
    title: string;
    name:string;
    email: string;
    phone: string;
}

interface PressRoomProps {
    title: string;
    rooms: RoomProps[];
}

export {PressRoomProps,RoomProps}