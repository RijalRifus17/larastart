<template>
    <div>
        <section class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1>Management Users</h1>
                    </div>
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item"><a href="#">Home</a></li>
                            <li class="breadcrumb-item active">Users</li>
                        </ol>
                    </div>
                </div>
            </div>
        </section>

        <div class="content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header">
                                <h3 class="card-title">Users Table</h3>

                                <div class="card-tools">
                                    <button class="btn btn-success" @click="newUser">
                                        Add New
                                        <i class="fa fa-user-plus"></i>
                                    </button>
                                </div>
                            </div>
                            <!-- /.card-header -->
                            <div class="card-body table-responsive p-0">
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Type</th>
                                            <th>Registered</th>
                                            <th>Modify</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="user in users" :key="user.id">
                                            <td>
                                                {{ user.id }}
                                            </td>
                                            <td>
                                                {{ user.name }}
                                            </td>
                                            <td>
                                                {{ user.email }}
                                            </td>
                                            <td>
                                                <span class="tag tag-success">
                                                    {{ user.type | upText}}
                                                </span>
                                            </td>
                                            <td>
                                                {{ user.created_at | myDate}}
                                            </td>
                                            <td>
                                                <a href="" @click.prevent="editUser(user)">
                                                    <i class="fa fa-edit"></i>
                                                </a>
                                                <a href="" @click.prevent="deleteUser(user.id)">
                                                    <i class="fa fa-trash text-red"></i>
                                                </a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <!-- /.card-body -->
                        </div>
                        <!-- /.card -->
                    </div>
                </div>
            </div>
        </div>



        <!-- Modal -->
        <div class="modal fade" id="add-user" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" v-show="!editMode" id="exampleModalLabel">Add New</h5>
                    <h5 class="modal-title" v-show="editMode" id="exampleModalLabel">Update</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form @submit.prevent="editMode ? updateUser() : createUser()">
                    
                    <div class="modal-body">
                        <div class="form-group">
                                <input v-model="form.name" type="text" name="name" placeholder="Name"
                                class="form-control" :class="{ 'is-invalid': form.errors.has('name') }">
                            <has-error :form="form" field="name"></has-error>
                        </div>
                        <div class="form-group">
                            <input v-model="form.email" type="text" name="name"
                                placeholder="Email Address"
                                class="form-control" :class="{ 'is-invalid': form.errors.has('email') }">
                            <has-error :form="form" field="email"></has-error>
                        </div>
                        <div class="form-group">
                            <input v-model="form.bio" type="text" name="bio"
                                placeholder="Short Bio"
                                class="form-control" :class="{ 'is-invalid': form.errors.has('bio') }">
                            <has-error :form="form" field="bio"></has-error>
                        </div>
                        <div class="form-group">
                            <select name="type" v-model="form.type" id="typr" class="form-control" :class="{'is-invalid' : form.errors.has('type')}">
                                <option value="">Select User Role</option>
                                <option value="Admin">Admin</option>
                                <option value="user">Standart User</option>
                                <option value="Author">Author</option>
                            </select>
                            <has-error :form="form" field="bio"></has-error>
                        </div>
                        <div class="form-group">
                            <input v-model="form.password" type="password" name="password"
                                placeholder="password"
                                class="form-control" :class="{ 'is-invalid': form.errors.has('password') }">
                            <has-error :form="form" field="password"></has-error>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button v-show="editMode" type="submit" class="btn btn-primary">Update</button>
                        <button v-show="!editMode" type="submit" class="btn btn-primary">Create</button>
                    </div>
                </form>
                
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                editMode: false,
                users: {},
                form: new Form({
                    id: '',
                    name: '',
                    email: '',
                    password: '',
                    type: '',
                    bio: '',
                    photo: ''
                })
            }
        },
        methods: {
            updateUser() {
                // console.log('editing data');
                this.$Progress.start()
                
                this.form.put("/api/user/" + this.form.id)
                .then(() => {
                    $('#add-user').modal('hide')     
                    this.loadUsers()  
                    swal.fire(
                        'Update!',
                        'Your file has been update.',
                        'success'
                    )         
                    this.$Progress.finish()                    
                })
                .catch(() => {
                    this.$Progress.fail()
                })

            },
            editUser(user) {
                this.editMode = true
                this.form.reset()
                $('#add-user').modal('show')
                this.form.fill(user)
            },
            newUser() {
                this.editMode = false
                this.form.reset()
                $('#add-user').modal('show')
            },
            deleteUser(id) {
                this.form.reset()
                swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                    }).then((result) => {
                        console.log(result);
                        
                            if (result.value) {
                                this.form.delete('/api/user/' + id).then(() => {
                                    swal.fire(
                                        'Deleted!',
                                        'Your file has been deleted.',
                                        'success'
                                    )
                                    Fire.$emit('AfterCreate')
                                }).catch(() =>{
                                    swal(
                                        'Failed!', 'Ada kesalahan', 'warning'
                                    )
                                })
                            }
                })
            },
            loadUsers() {
                axios.get('api/user').then(({ data }) => (this.users = data.data))
            },
            createUser() {
                this.$Progress.start()
                
                this.form.post('api/user')
                .then(() => {

                    Fire.$emit('AfterCreate')
                    $('#add-user').modal('hide')
                    
                    toast.fire({
                        type: 'success',
                        title: 'User created in successfully'
                    })
                                    
                
                    this.$Progress.finish()
                
                })
                .catch((err) =>{
                    this.$Progress.fail()
                })
            }
        },
        created() {
            this.loadUsers()
            Fire.$on('AfterCreate', () => {
                this.loadUsers()
            })
        }
    }

</script>
