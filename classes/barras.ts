export class BarrasData {

    private barras: string[] = ['0','1','2','3'];
    private valores: number[] = [0,0,0,0];

    constructor(){}

    getData(){
        return [{ data: this.valores, label: 'Ventas' }];
    }

    setData(barra: string, valor: number){

        barra = barra.trim();
        for(let i in this.barras){
            if(this.barras[i] === barra){
                this.valores[i] += valor;
            }
        }
        return this.getData();
    }
}