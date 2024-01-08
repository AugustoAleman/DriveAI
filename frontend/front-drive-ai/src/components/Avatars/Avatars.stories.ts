import type {Meta, StoryObj} from "@storybook/react"
import Avatars from "./Avatars"

/**
 * Avatar components: main, edit, information and main. Options change depending on the props given.
 */

const meta: Meta<typeof Avatars> = {
    title: "Components/Avatars",
    component: Avatars,
    tags: ['autodocs'],
    argTypes:{
        textOneAvatarMain:{control: "text"},
        textTwoAvatarMain:{control: "text"},
        textEdit:{control: "text"},
        textOneInfo:{control: "text"},
        textTwoInfo:{control: "text"},
    }
}

export default meta;
type Story = StoryObj<typeof Avatars>;

export const AvatarMain: Story = {
    args: {
        typeOfAvatars:"main",
        textOneAvatarMain: "MG5",
        textTwoAvatarMain:"Advanced",
        colorTwoAvatarMain:"#78787b",
        bgColorAvatarMain: "#ffffff",
        colorOneAvatarMain:"#000000",
        textEdit:"Editar",  
        textOneInfo:"Humberto",
        textTwoInfo:"#hrosas@tec.mx",
    },
};

export const EditAvatar: Story = {
    args: {
        typeOfAvatars: "edit",
        textEdit:"Editar",
        textOneAvatarMain: "MG5",
        textTwoAvatarMain:"Advanced",
        textOneInfo:"Humberto",
        textTwoInfo:"#hrosas@tec.mx",
    }
}

export const IconAvatar: Story = {
    args: {
        typeOfAvatars: "icon",
        textEdit:"Editar",
        textOneAvatarMain: "MG5",
        textTwoAvatarMain:"Advanced",
        textOneInfo:"Humberto",
        textTwoInfo:"#hrosas@tec.mx",
    }
}

export const InfoAvatar: Story = {
    args:{
        bgColorInfo:"#ffffff",
        colorOneInfo:"#0000ff",
        textOneInfo:"Humberto",
        textTwoInfo:"#hrosas@tec.mx",
        colorTwoInfo:"#0000ff",
        colorInfoOne:"#969696",
        colorInfoTwo:"#969696",
        textEdit:"Editar",
        textOneAvatarMain: "MG5",
        textTwoAvatarMain:"Advanced",
    }
}
