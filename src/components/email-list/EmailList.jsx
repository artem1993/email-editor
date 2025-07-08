import { Trash2 } from "lucide-react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import styles from "./EmailList.module.scss";
import parse from "html-react-parser";
import { emailService } from "../../services/email.service";

export function EmailList() {
	const queryClient = useQueryClient();

	const { data } = useQuery({
		queryKey: ["email list"],
		queryFn: () => emailService.getEmails(),
	});

	const { mutate, isPending } = useMutation({
		mutationKey: ["delete email"],
		mutationFn: (id) => emailService.deleteEmail(id),
		onSuccess() {
			queryClient.refetchQueries({ queryKey: ["email list"] });
		},
	});

	return (
		<div className={styles.list}>
			{data?.map((email) => (
				<div key={email.id}>
					<span>{parse(email.text)}</span>
					<Trash2
						size={15}
						style={{ cursor: "pointer", color: "#797979" }}
						onClick={() => mutate(email.id)}
						disabled={isPending}
					/>
				</div>
			))}
		</div>
	);
}
