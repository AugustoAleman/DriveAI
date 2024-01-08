import React from 'react'
import theme from 'theme/theme';
import { 
    FrameContainer,
    FrameElipse,
    FrameGroup,
    FrameFrame,
    FrameRectangle,
    FrameText,
    FrameTextTwo,
    FrameTextFour
} from './styles';
import { OptionProp } from './types';
import BgImg from './assets/rectangle151925-85vb.svg';
import Profile from './assets/ellipse41929-jjf-200w.png';

const Testimony: React.FC<OptionProp> =  ({
    body="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed.",
    name="Humberto",
    position="CEO",
    colorbg,
    colorname,
    colorposition,
    colorbody,
    elipseimg="http://www.w3.org/2000/svg",
}) => {
    return (
        <FrameContainer >
            <FrameFrame colorbg={colorbg}>
                <FrameRectangle src={BgImg}>
                </FrameRectangle>
                <FrameGroup>
                    <FrameText colorname={colorname}>{name}</FrameText>
                    <FrameTextTwo colorposition={colorposition}>{position}</FrameTextTwo>
                </FrameGroup>
                <FrameElipse src={Profile}></FrameElipse>
                <FrameTextFour colorbody={colorbody}>{body}</FrameTextFour>
            </FrameFrame>
        </FrameContainer>
    );
};

export default Testimony;