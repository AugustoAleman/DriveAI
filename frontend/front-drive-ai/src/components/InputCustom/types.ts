export interface ExampleMuiProp {
    /**
    * Chose the label string that mention the text for the Checkbox 
    */
    InputType: string;
}

export interface Option {
     /**
    * Select the value to define to Option prop
    */
    value: string;
     /**
    * Select  the label value to Option  prop
    */
    label: string;
  }
  
export interface CustomSelectProps {
     /**
    * put all the option for the Select 
    */
    options: Option[];
    /**
    * put the option for the label in Selected component
    */
    label: string;
    /**
    * Put the default Value and it's able to let it empty
    */
    defaultValue?: string;
    /**
    * You define the onChage option and how is manipulated  
    */
    onChange: (value: string) => void;
  }

export interface InputCheckboxProps {
    /**
    * Chose the label string that mention the text for the Checkbox 
    */
    label: string;
  }

