import React, { useMemo } from 'react';
import { FormGeneratorProps } from './FormGeneratorProps';
import { generateUiLayout } from './utility/generateUiLayout';
import { useDataUpdater } from './useDataUpdater';
import { FormUiLayout } from './FormUiLayout';
import styled from 'styled-components';

export const FormGenerator: React.FC<FormGeneratorProps> = ({
	schema,
	data,
	onChange,
	widgets,
	uiLayout: providedUiLayout,
}) => {
	const uiLayout = useMemo(() => {
		if (!providedUiLayout) {
			return generateUiLayout(schema)
		}

		return providedUiLayout;
	}, [providedUiLayout]);

	const updateData = useDataUpdater(schema, data, onChange);

	return (
		<FormRoot>
			<FormUiLayout
				uiLayout={uiLayout}
				schema={schema}
				widgetLookup={widgets}
				updateValue={updateData}
				data={data}
			/>
		</FormRoot>
	)
};

const FormRoot = styled.div`
	& > * {
		margin-bottom: 4px;

		&:last-child {
			margin-bottom: 0;
		}
	}
`;