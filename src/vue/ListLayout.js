var listLayout = {
    data() {
        return {
            list: [],
            sourceList: []
        };
    },
    watch: {       
    },
    computed:{             
    },
    methods: {        
        setSourceList( dataArr ) {
            this.sourceList = dataArr;
        },
        setList( dataArr ) {
            this.list = dataArr;
        },        
    },
    mounted(){        
    },
    destroyed(){
    }
};
export default listLayout;