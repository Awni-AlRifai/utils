class RandomizedCollection {
    constructor() {
        this.map = {};
        this.list = [];
    }
    insert(val){
        const len = this.list.length;
        // if the value does not exist create a new array
        if(!(val in this.map))this.map[val] = new Set([len])
        else this.map[val].add(len);
        this.list.push(val);
        return true;
    }
    remove(val){
        // if we pop the el from the array and the array becomes empty we should remove the key
        if(!(val in this.map))return false;
        console.log(this.map);
        console.log(this.list);
        const lastIndex = this.list.length - 1;
        const [index] = this.map[val];
        console.log("index",index);
        console.log('list',this.list);
        [this.list[index], this.list[lastIndex]] = [this.list[lastIndex], this.list[index]];
        console.log('list',this.list);
        console.log('map',this.map);
        const lastEl = this.map[this.list[index]];
        lastEl.delete(lastIndex);
        console.log(this.map);
        lastEl.add(index);
        this.map[val].delete(index);
        if(this.map[val].size === 0) delete this.map[val];
        this.list.pop()
        return true;
    }
}

const rand = new RandomizedCollection();
console.log(rand.insert(5));
console.log(rand.remove(5));
console.log(rand.remove(5));
console.log(rand.insert(5));
console.log(rand.insert(10));
console.log(rand.insert(5));
console.log(rand.remove(5));