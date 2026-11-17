/** Keep native table semantics and keyboard access without client-side JavaScript. */
export default function responsiveContent() {
	return {
		name: 'responsive-content',
		element: {
			filter: ['table', 'pre'],
			visit(node, context) {
				if (node.tagName === 'pre') {
					context.setProperty(node, 'tabIndex', 0);
					return;
				}

				// Reuse the localized caption or column headings for the region's name.
				const label = node.children.find((child) => child.tagName === 'caption')
					?? node.children.find((child) => child.tagName === 'thead');
				return {
					type: 'element',
					tagName: 'div',
					properties: {
						className: ['table-scroll'],
						tabIndex: 0,
						...(label && { role: 'region', ariaLabel: context.textContent(label).replace(/\s+/g, ' ').trim() }),
					},
					children: [node],
				};
			},
		},
	};
}
