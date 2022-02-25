import { MediaApi } from '@campaign-buddy/frontend-types';
import React, { createContext, useContext, useMemo } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

interface AvailableFormActions {
	canUpdateVisibilitySettings: boolean;
	canUpdateAggregationSettings: boolean;
}

interface VisibilitySetting {
	roles: string[];
	label: string;
}

interface FormWidgetContextData {
	mediaApi?: MediaApi;
	visibilitySettings?: VisibilitySetting[];
	availableActions?: AvailableFormActions;
}

const FormWidgetContext = createContext<FormWidgetContextData>({});

export interface FormWidgetProviderProps {
	queryClient: QueryClient;
	mediaApi: MediaApi;
	visibilitySettings?: VisibilitySetting[];
}

export const FormWidgetProvider: React.FC<FormWidgetProviderProps> = ({
	queryClient,
	children,
	mediaApi,
	visibilitySettings,
}) => {
	const contextValue = useMemo(
		() => ({ mediaApi, visibilitySettings }),
		[mediaApi, visibilitySettings]
	);
	return (
		<QueryClientProvider client={queryClient}>
			<FormWidgetContext.Provider value={contextValue}>
				{children}
			</FormWidgetContext.Provider>
		</QueryClientProvider>
	);
};

export function useMediaApi() {
	const { mediaApi } = useContext(FormWidgetContext);
	if (!mediaApi) {
		throw new Error('mediaApi must be supplied through FormWidgetProvider');
	}

	return mediaApi;
}

export function useVisibilitySettings(): VisibilitySetting[] {
	const { visibilitySettings } = useContext(FormWidgetContext);
	return visibilitySettings ?? [];
}

export function useAvailableActions(): AvailableFormActions {
	const { availableActions } = useContext(FormWidgetContext);
	return (
		availableActions ?? {
			canUpdateAggregationSettings: false,
			canUpdateVisibilitySettings: false,
		}
	);
}
