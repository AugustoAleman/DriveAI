export interface AdministrativeToolbarProps {
	about: string;
	title: string;
	tabs?: string[] | null;
	activeTab?: string | null;
	description?: string;
	new_requests?: number | null;
	old_requests?: number | null;
	onTabClick: (tab: string) => void;
	details?: boolean;
	dateEvent?: string;
	href?: string;
}
