export const es = {
	site: {
		name: 'Alejandro Riera',
		title: 'Alejandro Riera | Portfolio profesional',
		description: 'Portfolio profesional de Alejandro Riera',
	},
	nav: {
		home: 'Inicio',
		work: 'Proyectos',
		about: 'Sobre mí',
		menu: 'Menú',
		language: 'Idioma',
	},
	theme: {
		dark: 'Tema oscuro',
	},
	footer: {
		credit: 'Diseñado y desarrollado con',
	},
	contact: {
		title: '¿Tienes alguna duda?',
		action: 'Envíame un mensaje',
	},
	skills: {
		computerEngineer: {
			title: 'Ingeniero Informático',
			description: 'Apasionado por la tecnología, el desarrollo de software y la resolución de problemas',
		},
		curiosity: {
			title: 'Curiosidad tecnológica',
			description: 'Me interesa explorar nuevas tecnologías y comprender cómo aplicarlas a problemas reales',
		},
		learning: {
			title: 'Aprendizaje continuo',
			description: 'Curioso, proactivo y motivado por afrontar nuevos retos y seguir creciendo profesionalmente',
		},
	},
	home: {
		title: 'Hola, me llamo Alejandro Riera',
		tagline: 'Soy ingeniero informático con formación en ciberseguridad y experiencia en desarrollo de software y tecnologías cloud. Me apasiona construir soluciones eficientes, seguras y escalables',
		roles: {
			developer: 'Developer',
			cloudEngineer: 'Cloud Engineer',
			cybersecurity: 'Cybersecurity',
		},
		portraitAlt: 'Alejandro Riera frente a una puesta de sol',
		workTitle: 'Proyectos recientes',
		workDescription: 'Echa un vistazo a mis proyectos más recientes',
		viewAll: 'Ver todos',
		credentials: {
			title: 'Formación y certificaciones',
			description: 'Mi formación académica y certificaciones profesionales reflejan mi compromiso con el aprendizaje continuo y la especialización tecnológica',
			items: {
				degree:{
					title: 'Grado en Ingeniería Informática',
            		subtitle: 'Universidad de León',
				},
				master:{
					title: 'Máster en Investigación en Ciberseguridad',
            		subtitle: 'Universidad de León',
				},
				awsSAA:{
					title: 'AWS Certified Solutions Architect - Associate',
            		subtitle: 'Amazon Web Services',
				},
				ciscoCyberOps:{
					title: 'CyberOps Associate',
            		subtitle: 'Cisco',
				},
				english: {
					title: 'Inglés B2',
					subtitle: 'Oxford',
				},
			}
		}
	},
	about: {
		metaTitle: 'Sobre mí | Alejandro Riera',
		metaDescription: 'Sobre Alejandro Riera',
		title: 'Sobre mí',
		tagline: 'Mi trayectoria, experiencia y lo que me motiva a seguir aprendiendo',
		imageAlt: 'Alejandro Riera en la montaña',
		background: {
			upperTitle: 'UN POCO SOBRE MÍ',
			title: 'Tecnología, curiosidad y nuevos retos.',
			description1: 'Soy ingeniero informático con formación en ciberseguridad y experiencia profesional en desarrollo de software y tecnologías cloud.',
			description2: 'Me gusta entender cómo funcionan las cosas, resolver problemas y seguir ampliando mis conocimientos. Actualmente, mis principales intereses profesionales se encuentran en la ingeniería cloud y la ciberseguridad.',
			description3: 'Más allá de la tecnología, disfruto practicando todo tipo de deportes, tanto individuales como en equipo, y pasando tiempo en la naturaleza, especialmente en la montaña. También me considero una persona sociable y valoro mucho compartir momentos con mis amigos y mi familia, buscando siempre un equilibrio entre mis inquietudes profesionales y personales.',
		},
		experience: {
			upperTitle: 'MI TRAYECTORIA',
			title: 'Experiencia profesional',
			description: 'Un recorrido por los proyectos y equipos con los que he trabajado',
			cybersecurityResearcher: {
				period: 'OCT 2025 — MAY 2026',
				role: 'Investigador en Ciberseguridad',
				company: 'Universidad de León',
				description: 'Investigación aplicada en ciberseguridad: desarrollo de honeypots, análisis de malware y automatización de informes mediante Python y modelos de lenguaje en el proyecto CiberLab',
			},
			juniorSystemsEngineer: {
				period: 'AGO 2024 — SEP 2025',
				role: 'Ingeniero de Sistemas Junior',
				company: 'IndraMind Cybersecurity / SIA',
				description: 'Desarrollo y optimización de aplicaciones AML para Banco Santander con Python, PySpark, MongoDB y Kubernetes. Posteriormente, procesamiento de datos y mantenimiento de soluciones en AWS SageMaker para BBVA',
			},
			internSIA: {
				period: 'OCT 2023 — JUL 2024',
				role: 'Becario',
				company: 'IndraMind Cybersecurity / SIA',
				description: 'Desarrollo de herramientas de triaje de incidencias de ciberseguridad con Python y Apache Airflow, integrando sistemas de ticketing. Posterior incorporación al desarrollo de aplicaciones de monitorización de transacciones bancarias',
			},
		},
		education: {
			upperTitle: 'MI FORMACIÓN',
			title: 'Formación académica',
			degree: {
				title: 'Grado en Ingeniería Informática',
				institution: 'Universidad de León',
				period: '2020 — 2024',
			},
			master: {
				title: 'Máster en Investigación en Ciberseguridad',
				institution: 'Universidad de León',
				period: '2024 — 2026',
			},
		},
		skills: {
			upperTitle: 'HERRAMIENTAS',
			title: 'Tecnologías y habilidades',
			description: 'Algunas de las tecnologías con las que he trabajado',
			technologies: {
				cloud: 'Cloud & Infraestructura',
				development: 'Desarrollo & Datos',
				security: 'Seguridad & Automatización',
			},
		},
	},
	work: {
		metaTitle: 'Mis Proyectos | Alejandro Riera',
		metaDescription: 'Descubre los proyectos de Alejandro Riera en desarrollo de software, cloud y ciberseguridad',
		title: 'Mis Proyectos',
		tagline: 'Explora mis proyectos y descubre las tecnologías y soluciones con las que he trabajado',
		back: 'Proyectos',
	},
	notFound: {
		metaTitle: 'Página no encontrada',
		metaDescription: 'Error 404 — La página que buscas no existe',
		title: 'Página no encontrada',
		tagline: 'Error 404',
	},
};

export type Messages = typeof es;
