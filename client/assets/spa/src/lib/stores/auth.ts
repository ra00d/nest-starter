import { create } from "zustand";
import { persist } from "zustand/middleware";
const user = {
	id: 1,
	email: "",
	name: "",
	role: "",
	active: true,
};
export type TUser = Partial<typeof user>;
type AuthStore = {
	authenticated: boolean;
	user: TUser;
	setUser: (user: TUser) => void;
	getUser: () => TUser;
};

export const useAuth = create(
	persist<AuthStore>(
		(set, get) => ({
			authenticated: false,
			user: {
				name: "Guest",
				email: "",
				role: "Gest",
			},
			setUser: (user) => {
				set((state) => ({
					...state,
					authenticated: true,
					user,
				}));
			},
			getUser: () => {
				return get().user;
			},
		}),

		{
			name: "auth-store",
		},
	),
);
