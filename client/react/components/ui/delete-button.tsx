import { PropsWithChildren } from "react";
import { toast } from "sonner";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
type DeleteButtonProps = {
	action: Awaited<() => Promise<void>>;
	dropdown?: boolean;
} & PropsWithChildren;
export default function DeleteButton(props: DeleteButtonProps) {
	return (
		<AlertDialog>
			<AlertDialogTrigger
				className={
					props.dropdown
						? "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent w-full focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
						: "cursor-pointer "
				}
				asChild={!!props.children}
			>
				<>{props.children ? props.children : "Delete"}</>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This item will deleted permintaly
					</AlertDialogDescription>
				</AlertDialogHeader>

				<AlertDialogFooter className="flex gap-5">
					<AlertDialogCancel>Cancel</AlertDialogCancel>{" "}
					<AlertDialogAction asChild>
						<Button
							variant="destructive"
							className="!bg-destructive"
							onClick={async () => {
								try {
									await props.action();
									toast.success("Done");
								} catch (error) {
									toast.error("somthing went wrong", {
										description: (error as Error)?.message,
									});
								}
							}}
						>
							Delete
						</Button>
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
