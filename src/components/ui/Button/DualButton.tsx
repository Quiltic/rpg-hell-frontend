import { Button } from "./Button";



type Props = {
    leftIcon: any;
    leftFunction: any;
    leftClassName: string;
    rightIcon: any;
    rightFuntion: any;
    rightClassName: string;
};


export default function DualButton({
    leftIcon: leftIcon,
    leftFunction: leftFunction,
    leftClassName: leftClassName,
    rightIcon: rightIcon,
    rightFuntion: rightFuntion,
    rightClassName: rightClassName,
    }: Props) {


    return (
        <div className="flex flex-row">
            <Button  
                leftIcon={rightIcon} 
                variant="subtle"
                className="flex justify-center rounded-l-full rounded-r-none h-9 w-9"
                onClick={() => {
                    
                    }
                }>
            </Button>
            <Button 
                leftIcon={leftIcon} 
                variant="subtle"
                className="flex justify-center rounded-r-full rounded-l-none h-9 w-9"
                onClick={() => {
                    
                    }
                }>
            </Button>
        </div>
    );
}


