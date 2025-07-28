import { LuUserCog, LuKeyRound, LuTrash } from "react-icons/lu";
import { ModalButton } from "../components/modals/ModalButton";
import { EditProfileModal } from "../components/users/EditProfileModal";
import { useNavigate } from "react-router-dom";
import { ChangePasswordModal } from "../components/users/ChangePasswordModal";
import { DeleteAccountModal } from "../components/users/DeleteAccountModal";

export default function ProfileView() {
	const navigate = useNavigate();
	// Datos de ejemplo del usuario
	const user = {
		name: "John Doe",
		role: "admin",
		email: "john.doe@example.com",
	};

	return (
		<>
			<div className="flex w-full h-full flex-col items-center justify-start p-8 bg-bg-main gap-8">
				<div className="flex flex-col items-center gap-2">
					<LuUserCog size={120} strokeWidth={0.5} />
					<p className="text-2xl font-bold text-text">{user.name}</p>
					<p className="text-lg text-bg-button-primary font-bold">
						{user.role}
					</p>
				</div>

				<div className="w-full max-w-4xl bg-bg-secondary rounded-lg p-6 flex items-center justify-between">
					<div>
						<h3 className="text-2xl font-bold mb-4 border-b border-text/20 pb-2">
							Personal information
						</h3>
						<div className="space-y-3">
							<p>
								<span className="font-bold">Rol user:</span>{" "}
								<span>{user.role}</span>
							</p>
							<p>
								<span className="font-bold">Name:</span> {user.name}
							</p>
							<p>
								<span className="font-bold">Email:</span> {user.email}
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
			<EditProfileModal />
			<ChangePasswordModal />
			<DeleteAccountModal />
		</>
	);
}
