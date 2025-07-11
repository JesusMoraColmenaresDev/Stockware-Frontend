import { useForm } from "react-hook-form";
import { SearchField } from "../components/SearchField";
import { ModalButton } from "../components/ModalButton";
import { LuSearch, LuSquarePen, LuX } from "react-icons/lu";

type UsersViewFormValues = {
    searchUser: string;
};

const defaultValues: UsersViewFormValues = {
    searchUser: "",
};

export default function UsersView() {

    const {
        register,
        watch,
        reset: resetSearch,
    } = useForm<UsersViewFormValues>({
        defaultValues,
    });

    const searchUser = watch("searchUser");

    return (
        <div className="flex w-full h-full flex-col">

            <div className="flex flex-col px-[48px] pb-[1rem] pt-[1.5rem] gap-[1rem]">
                <h2 className="flex text-4xl font-bold gap-[0.75rem]">
                    Users
                    {/* <span className="opacity-55"> {users.length}</span> */ searchUser}
                </h2>

                <div className="flex w-1/2 gap-[48px] ">
                    <p className="text-3xl font-extrabold text-bg-button-primary">
                        Admins<span className="ml-4 opacity-50">1</span>
                    </p>
                    <p className="text-3xl font-extrabold">
                        Users<span className="ml-4 opacity-50">2</span>
                    </p>

                </div>

                <div className="flex w-1/2 gap-[1rem]">
                    <div className="flex w-3/5">
                        <SearchField
                            name="searchUser"
                            register={register}
                            reset={resetSearch}
                            watch={watch}
                            placeholder="Search User . . ."
                            defaultValues={defaultValues}
                        />
                    </div>
                </div>
            </div>

            <div className="bg-bg-main flex-1">

                <table className="w-full table-fixed border-separate border-spacing-x-[2rem] border-spacing-y-[0.5rem]">
                    <thead>
                        <tr className="text-center py-[0.1rem]">
                            <th className="w-1/3">Name</th>
                            <th className="w-1/4">Role</th>
                            <th className="w-1/4">Date Added</th>
                            <th className="w-1/6">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Se itera sobre los datos de los usuarios una vez que estén disponibles */}
                        {/* {users.map((user) => ( */}
                        <tr /* key={user.id} */>
                            <td>
                                <div className="flex items-center" /* title={`${user.name}`} */>
                                    <span className="block truncate">{/* {user.name} */} Placeholder User</span>
                                </div>
                            </td>
                            <td>
                                <div className="flex items-center justify-center text-center" /* title={`${user.role}`} */>
                                    {/* {user.role} */} Admin
                                </div>
                            </td>
                            <td>
                                <div className="flex items-center justify-center text-center" /* title={`${user.date_added}`} */>
                                    {/* {user.date_added} */} 2024-05-21
                                </div>
                            </td>
                            <td>
                                <div className="flex items-center justify-center h-[2rem] gap-2">
                                    <LuSearch className="w-[1.5rem] h-auto hover:text-accent" title="Details" />
                                    <LuSquarePen className="w-[1.5rem] h-auto hover:text-accent" title="Modify" />
                                    <LuX className="w-[1.5rem] h-auto hover:text-accent" title="Delete" />
                                </div>
                            </td>
                        </tr>
                        {/* ))} */}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
