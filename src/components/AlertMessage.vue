<script>
export default {
    name: 'AlertMessage',
    props: {
        message: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            default: 'info',
        },
        autoClose: {
            type: Boolean,
            default: true,
        },
        duration: {
            type: Number,
            default: 4000,
        }
    },
    data() {
        return {
            visible: true,
        };
    },
    mounted() {
        if (this.autoClose) {
            setTimeout(() => {
                this.visible = false;
            }, this.duration);
        }
    }
};
</script>

