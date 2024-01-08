import type {Meta, StoryObj} from  "@storybook/react";
import CarCards from "./CarCards";

/**
 * Car Cards components: variant one and two. Options change depending on the props given.
 */


const meta: Meta<typeof CarCards> = {
    title: "Components/CarCards",
    component: CarCards,
    tags: ['autodocs'],
    argTypes: {
        textCarOne:{control:"text"},
        textCarTwo:{control:"text"},
        textCarThree:{control:"text"},
 
        textOneVTwo:{control: "text"},     
        textTwoVTwo:{control: "text"},
        textThreeVTwo:{control: "text"},
        textFourVTwo:{control: "text"},
        textFiveVTwo:{control: "text"},
        textSixVTwo:{control: "text"},
    },
};

export default meta;
type Story = StoryObj<typeof CarCards>;
export const VariantOneCar: Story = {
    args: {
        variantCard:"one",
        bgColorVTwo:"#ffffff",     
        cardColorVTwo:"#d9d9d9",   
        textOneVTwo:"$414,000",     
        colorTextOneVtwo:"#000000",
        textTwoVTwo:"Editar",
        colorTextTwoVtwo:"#1a69e0",
        textThreeVTwo:"Jeep Grand Cherokee, 2017",
        colorTextThreeVtwo:"#000000",
        textFourVTwo:"+",
        colorTextFourVtwo:"#ffffff",
        textFiveVTwo:"José López González",
        colorTextFiveVtwo:"#ffffff",
        textSixVTwo:"Nissan Santa Fe",
        colorTextSixVtwo:"#78787b",
        colorBoxOneVTwo:"#000000",
        colorBoxTwoVTwo:"#ffffff",
        
        bgColor:'#ffffff',
        colorCarcard:'#ffffff',
        textCarOne:'$ 414,000',
        colorCarOne:'#000000',
        textCarTwo:'Jeep Grand Cherokee, 2017',
        colorCarTwo:'#000000',
        textCarThree:'Nissan Santa Fe',
        colorCarThree:'#78787b',

        colorOptionOne: ['#7c5606', '#0e0e0e', '#7c5606', '#a83076'],
        colorOptionTwo: ['#7c5606', '#0e0e0e', '#7c5606', '#a83076','#a83076']
    },
};

export const VariantTwoCar:Story ={
    args:{
        variantCard:"second",
        bgColor:'#ffffff',
        colorCarcard:'#ffffff',
        textCarOne:'$ 414,000',
        colorCarOne:'#000000',
        textCarTwo:'Jeep Grand Cherokee, 2017',
        colorCarTwo:'#000000',
        textCarThree:'Nissan Santa Fe',
        colorCarThree:'#78787b',

        bgColorVTwo:"#ffffff",     
        cardColorVTwo:"#d9d9d9",   
        textOneVTwo:"$414,000",     
        colorTextOneVtwo:"#000000",
        textTwoVTwo:"Editar",
        colorTextTwoVtwo:"#1a69e0",
        textThreeVTwo:"Jeep Grand Cherokee, 2017",
        colorTextThreeVtwo:"#000000",
        textFourVTwo:"+",
        colorTextFourVtwo:"#ffffff",
        textFiveVTwo:"José López González",
        colorTextFiveVtwo:"#ffffff",
        textSixVTwo:"Nissan Santa Fe",
        colorTextSixVtwo:"#78787b",
        colorBoxOneVTwo:"#000000",
        colorBoxTwoVTwo:"#ffffff",

        colorOptionOne: ['#7c5606', '#0e0e0e', '#7c5606', '#a83076'],
        colorOptionTwo: ['#7c5606', '#0e0e0e', '#7c5606', '#a83076','#a83076']
    }
}