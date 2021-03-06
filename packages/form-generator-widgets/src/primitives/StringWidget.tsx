import React from 'react';
import {
	Input,
	AggregatedTextInput,
	AggregatedDisplayText,
	FormGroup,
} from '@campaign-buddy/core-ui';
import { useAggregationContainsBase } from '../utility';
import { CBWidgetProps } from '../CBWidgetProps';

export const StringWidget: React.FC<
	React.PropsWithChildren<CBWidgetProps<string, string>>
> = ({ value, aggregatedValue, onChange, aggregation, label }) => {
	const isEditable = useAggregationContainsBase(aggregation);

	if (aggregation && !isEditable) {
		return (
			<FormGroup label={label} labelFor="">
				<AggregatedDisplayText>{aggregatedValue ?? ''}</AggregatedDisplayText>
			</FormGroup>
		);
	}

	if (aggregation) {
		return (
			<AggregatedTextInput
				value={value ?? ''}
				aggregatedDisplayValue={aggregatedValue ?? ''}
				onChange={onChange}
				label={label}
			/>
		);
	}

	return <Input label={label} value={value ?? ''} onChange={onChange} />;
};
