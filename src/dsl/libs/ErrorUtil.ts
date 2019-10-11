export default class ErrorUtil {
    
    public static loopCheck(name: string, numLoops: number, maxLoops: number): void {
        if(numLoops > maxLoops){
            throw new Error(`${name} performed over ${maxLoops} loops.`);
        }
    }

    public static varUndefined(name: string): void {
        throw new Error(`${name} is undefined.`);
    }

    public static varDuplicate(name: string): void {
        throw new Error(`${name} is already defined.`);
    }
}