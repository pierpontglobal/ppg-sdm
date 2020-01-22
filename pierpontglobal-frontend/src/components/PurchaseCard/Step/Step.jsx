import React from 'react';
import Text from '../../styles/Text/Text';
import RoundBadge from './../../RoundBadge/RoundBadge';

function Step({number, date, completed, text}) {
    return (
        <div className="d-flex justify-content-between px-3">
            <div className="d-flex">
                <RoundBadge 
                    count={number}
                    color={completed ? '#007aff' : '#dedede'}
                    fontColor={!completed && '#656565'}
                    className="align-self-start" 
                />
                <Text
                    className="ml-3 mb-1"
                    fontSize="0.875em"
                    lineHeight={2}
                    opacity={completed ? 1.0 : 0.54}
                >
                    {text}
                </Text>
            </div>
            <Text
                className="mb-1"
                fontSize="0.875em"
                lineHeight={2}
                opacity={completed ? 1.0 : 0.54}
            >
                {date}
            </Text>
        </div>
    )
}

export default Step;