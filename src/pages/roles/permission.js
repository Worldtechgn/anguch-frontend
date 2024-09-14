export default function getRoleMasterData() {
	return [
		{
			id: 1,
			resourceName: "Dashboard",
			read: true,
			write: false,
			update: false,
			delete: false,
			name: "dashboard"
		},
		{
			id: 2,
			resourceName: "Utlisateurs",
			read: false,
			write: false,
			update: false,
			delete: false,
			name: "utilisateur"
		},
		{
			id: 3,
			resourceName: "Catastrophe",
			read: true,
			write: false,
			update: false,
			delete: false,
			name: "site-inondable"
		},
		{
			id: 4,
			resourceName: "Personne",
			read: false,
			write: false,
			update: false,
			delete: false,
			name: "list-info-personne"
		},
		{
			id: 5,
			resourceName: "deplaçant",
			read: false,
			write: false,
			update: false,
			delete: false,
			name: "list-deplacement"
		},
		{
			id: 6,
			resourceName: "Réfugie",
			read: false,
			write: false,
			update: false,
			delete: false,
			name: "list-refugie"
		},
		{
			id: 7,
			resourceName: "Migrant",
			read: false,
			write: false,
			update: false,
			delete: false,
			name: "list-migrant"
		},
		{
			id: 8,
			resourceName: "Role",
			read: false,
			write: false,
			update: false,
			delete: false,
			name: "liste-role"
		},
		{
			id: 9,
			resourceName: "Assignation des roles",
			read: false,
			write: false,
			update: false,
			delete: false,
			name: "liste-permission"
		}
	]
}

