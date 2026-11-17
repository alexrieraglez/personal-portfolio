// Los textos de la plantilla se conservan como placeholders para editarlos después.
import type { Messages } from './es';

export const en = {
	site: {
		name: 'Alejandro Riera',
		title: 'Alejandro Riera | Professional Portfolio',
		description: 'Professional portfolio of Alejandro Riera',
	},
	nav: {
		home: 'Home',
		work: 'Projects',
		about: 'About Me',
		menu: 'Menu',
		language: 'Language',
	},
	theme: {
		dark: 'Dark theme',
	},
	footer: {
		credit: 'Designed and built with',
	},
	contact: {
		title: 'Have any questions?',
		action: 'Get in touch',
	},
	skills: {
		computerEngineer: {
			title: 'Computer Engineer',
			description: 'Passionate about technology, software development and problem-solving',
		},
		curiosity: {
			title: 'Technological Curiosity',
			description: 'I enjoy exploring new technologies and understanding how to apply them to real-world challenges',
		},
		learning: {
			title: 'Continuous Learning',
			description: 'Curious, proactive and motivated to take on new challenges and keep growing professionally',
		},
	},
	home: {
		title: "Hi, I'm Alejandro Riera",
		tagline: 'I am a computer engineer with a background in cybersecurity and experience in software development and cloud technologies. I am passionate about building efficient, secure and scalable solutions',
		roles: {
			developer: 'Developer',
			cloudEngineer: 'Cloud Engineer',
			cybersecurity: 'Cybersecurity',
		},
		portraitAlt: 'Alejandro Riera in front of a sunset',
		workTitle: 'Recent projects',
		workDescription: 'Take a look at some of my most recent projects',
		viewAll: 'View all',
		credentials: {
			title: 'Education & Certifications',
			description: 'My academic background and professional certifications reflect my commitment to continuous learning and technological specialization',
			items: {
				degree: {
					title: "Bachelor's Degree in Computer Engineering",
					subtitle: 'University of León',
				},
				master: {
					title: "Master's Degree in Cybersecurity Research",
					subtitle: 'University of León',
				},
				awsSAA: {
					title: 'AWS Certified Solutions Architect - Associate',
					subtitle: 'Amazon Web Services',
				},
				ciscoCyberOps: {
					title: 'CyberOps Associate',
					subtitle: 'Cisco',
				},
				english: {
					title: 'English B2',
					subtitle: 'Oxford',
				},
			},
		},
	},
	about: {
		metaTitle: 'About Me | Alejandro Riera',
		metaDescription: 'Learn more about Alejandro Riera',
		title: 'About Me',
		tagline: 'My journey, professional experience and what motivates me to keep learning',
		imageAlt: 'Alejandro Riera in the montains',
		background: {
			upperTitle: 'A LITTLE ABOUT ME',
			title: 'Technology, curiosity and new challenges.',
			description1: 'I am a computer engineer with a background in cybersecurity and professional experience in software development and cloud technologies.',
			description2: 'I enjoy understanding how things work, solving problems and continuously expanding my knowledge. My main professional interests currently lie in cloud engineering and cybersecurity.',
			description3: 'Beyond technology, I enjoy practicing all kinds of sports, both individually and as part of a team, as well as spending time outdoors, especially in the mountains. I also consider myself a sociable person and truly value spending quality time with my friends and family, always striving to maintain a healthy balance between my professional and personal interests.',
		},
		experience: {
			upperTitle: 'MY JOURNEY',
			title: 'Professional Experience',
			description: 'A journey through the projects and teams I have worked with',
			cybersecurityResearcher: {
				period: 'OCT 2025 — MAY 2026',
				role: 'Cybersecurity Researcher',
				company: 'University of León',
				description: 'Applied cybersecurity research: honeypot development, malware analysis, and automated report generation using Python and large language models as part of the CiberLab project',
			},
			juniorSystemsEngineer: {
				period: 'AUG 2024 — SEP 2025',
				role: 'Junior Systems Engineer',
				company: 'IndraMind Cybersecurity / SIA',
				description: 'Development and optimization of AML applications for Banco Santander using Python, PySpark, MongoDB, and Kubernetes. Later, data processing and maintenance of AWS SageMaker solutions for BBVA',
			},
			internSIA: {
				period: 'OCT 2023 — JUL 2024',
				role: 'Software Engineering Intern',
				company: 'IndraMind Cybersecurity / SIA',
				description: 'Developed cybersecurity incident triage tools using Python and Apache Airflow, integrating ticketing systems. Later joined the development of banking transaction monitoring applications',
			},
		},
		education: {
			upperTitle: 'MY EDUCATION',
			title: 'Academic Background',
			degree: {
				title: "Bachelor's Degree in Computer Engineering",
				institution: 'University of León',
				period: '2020 — 2024',
			},
			master: {
				title: "Master's Degree in Cybersecurity Research",
				institution: 'University of León',
				period: '2024 — 2026',
			},
		},
		skills: {
			upperTitle: 'TOOLBOX',
			title: 'Technologies & Skills',
			description: 'Some of the technologies I have worked with',
			technologies: {
				cloud: 'Cloud & Infrastructure',
				development: 'Development & Data',
				security: 'Security & Automation',
			},
		},
	},
	work: {
		metaTitle: 'My Projects | Alejandro Riera',
		metaDescription: "Explore Alejandro Riera's projects in software development, cloud computing and cybersecurity",
		title: 'My Projects',
		tagline: 'Explore my projects and discover the technologies and solutions I have worked with',
		back: 'Projects',
	},
	notFound: {
		metaTitle: 'Not Found',
		metaDescription: '404 Error — this page was not found',
		title: 'Page Not Found',
		tagline: 'Not found',
	},
} satisfies Messages;
