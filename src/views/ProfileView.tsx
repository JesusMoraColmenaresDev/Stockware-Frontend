import { LuUserCog, LuKeyRound, LuTrash } from "react-icons/lu";
import { ModalButton } from "../components/modals/ModalButton";
import { EditProfileModal } from "../components/users/EditProfileModal";
import { useNavigate } from "react-router-dom";
import { ChangePasswordModal } from "../components/users/ChangePasswordModal";
import { DeleteAccountModal } from "../components/users/DeleteAccountModal";
import { useGetProfileInfo } from "../api/profileApi";
import { Spinner } from "../components/Spinner";
import { createDBBackUp } from "../api/usersApi";
import { useState } from "react";

export default function ProfileView() {
	const [requestMessage, setrequestMessage] = useState("");
	const [messageColor, setMessageColor] = useState("");
	const navigate = useNavigate();

	const { data: profile, isLoading, isError, error } = useGetProfileInfo();

	const handleClick = async () => {
		const response = await createDBBackUp();
		if (response) {
			setMessageColor("text-sucess");
			setrequestMessage(response);
		} else {
			setMessageColor("text-bg-button-delete");
			setrequestMessage("No response from the server.");
		}
	};

	if (isLoading) {
		return (
			<div className="flex flex-col justify-center items-center min-h-screen">
				<Spinner size="20rem" colorPrimary="#2C3E50" colorSecondary="#3498DB" />
			</div>
		);
	}

	if (isError) {
		return <div>Error al cargar el perfil: {error.message}</div>;
	}

	return (
		<>
			<div className="flex w-full min-h-screen flex-col items-center justify-start p-8 bg-bg-main gap-8 max-md:mt-18">
				{profile?.role === "admin" && (
					<div className="flex items-center w-full relative ">
						<div
							className={`flex-1 flex justify-center ${messageColor} font-bold text-lg p-4 rounded-md`}
						>
							{requestMessage}
						</div>
						<button
							className="text-xl font-bold flex justify-end text-center items-center gap-[0.5rem] py-[0.5rem] px-[1rem] rounded-md text-white bg-bg-button-primary hover:bg-bg-button-secondary"
							onClick={() => handleClick()}
						>
							Create BackUp
						</button>
					</div>
				)}
				<div className="flex flex-col items-center gap-2">
					<LuUserCog size={120} strokeWidth={0.5} />
					<p className="text-2xl font-bold text-text">{profile?.name}</p>
					<p className="text-lg text-bg-button-primary font-bold">
						{profile?.role}
					</p>
				</div>

				<div className="w-full max-w-4xl bg-bg-secondary rounded-lg p-6 flex max-md:flex-col max-md:gap-8 items-center justify-between">
					<div>
						<h3 className="text-2xl font-bold mb-4 border-b border-text/20 pb-2">
							Personal information
						</h3>
						<div className="space-y-3">
							<p>
								<span className="font-bold">Rol user:</span>{" "}
								<span>{profile?.role}</span>
							</p>
							<p>
								<span className="font-bold">Name:</span> {profile?.name}
							</p>
							<p>
								<span className="font-bold">Email:</span> {profile?.email}
							</p>
						</div>
					</div>
					<ModalButton
						text="Edit personal information"
						searchParam="editProfile"
						openModal={true}
						classNameInyect="px-6 py-2 text-lg font-bold h-fit"
						disabled={false}
					/>
				</div>
				<div className="flex justify-center items-center gap-[1rem]">
					<button
						className="flex items-center gap-[0.5rem] py-[0.5rem] px-[1rem] rounded-md text-white bg-bg-button-primary hover:bg-bg-button-secondary"
						onClick={() => navigate(location.pathname + "?changePassword=true")}
					>
						<LuKeyRound />
						Change Password
					</button>
					<button
						className="flex items-center gap-[0.5rem] py-[0.5rem] px-[1rem] rounded-md text-white bg-bg-button-delete hover:bg-bg-button-delete-hover"
						onClick={() => navigate(location.pathname + "?deleteAccount=true")}
					>
						<LuTrash />
						Delete Account
					</button>
				</div>
			</div>
			{profile && <EditProfileModal profile={profile} />}
			{profile && <ChangePasswordModal />}
			{profile && <DeleteAccountModal />}
		</>
	);
}
