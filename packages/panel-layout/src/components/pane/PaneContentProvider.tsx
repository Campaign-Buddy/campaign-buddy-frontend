import React, { useContext, useEffect, useMemo, useRef } from 'react';
import * as portals from 'react-reverse-portal';
import { PaneModel } from '../../panelLayoutModel';
import { PaneDefinition } from './PaneDefinition';
import { PaneWrapper } from './PaneWrapper';

interface PaneProviderContext {
	paneNodes: Record<string, portals.HtmlPortalNode>;
}

const PaneContext = React.createContext<PaneProviderContext>({ paneNodes: {} });

export function usePaneNode(id: string) {
	const { paneNodes } = useContext(PaneContext);

	const paneNode = paneNodes[id];

	if (!paneNode) {
		return null;
	}

	return paneNode;
}

interface PaneContentProviderProps {
	panes: PaneModel[];
	paneComponents: Record<string, PaneDefinition>;
}

export function PaneContentProvider({
	panes,
	paneComponents,
	children,
}: React.PropsWithChildren<PaneContentProviderProps>) {
	const paneNodes = useRef<Record<string, portals.HtmlPortalNode>>({});

	useEffect(() => {
		const paneIds = new Set(panes.map((x) => x.getId()));
		for (const key of Object.keys(paneNodes.current)) {
			if (!paneIds.has(key)) {
				delete paneNodes.current[key];
			}
		}
	}, [panes]);

	const paneContext = useMemo(
		() => ({
			paneNodes: Object.fromEntries(
				panes.map((pane) => {
					const paneId = pane.getId();
					if (!paneNodes.current[paneId]) {
						paneNodes.current[paneId] = portals.createHtmlPortalNode();
					}

					const node = paneNodes.current[paneId];

					return [pane.getId(), node];
				})
			),
		}),
		[panes]
	);

	return (
		<PaneContext.Provider value={paneContext}>
			<>
				{panes.map((x) => (
					<portals.InPortal
						node={paneContext.paneNodes[x.getId()]}
						key={x.getId()}
					>
						<PaneWrapper pane={x} paneComponents={paneComponents} />
					</portals.InPortal>
				))}
				{children}
			</>
		</PaneContext.Provider>
	);
}
