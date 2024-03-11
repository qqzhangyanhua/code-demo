
    <template>
      <el-dialog title="提示" :visible.sync="dialogVisible"  width="360px">
      </el-dialog>
    </template>
    <script>
    export default {
      props: {
        showVisible: {
          type: Boolean,
          default: false,
        },
      },
      data() {
        return {};
      },
      created() {},
      computed: {
        dialogVisible: {
          get() {
            return this.showVisible;
          },
          set() {
            this.$emit("closed", false);
          },
        },
      },
      methods: {},
    };
    </script>
    <style lang="scss" scoped></style>
    
    