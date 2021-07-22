<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\BankRequest;
use App\Models\User;
use Backpack\CRUD\app\Http\Controllers\CrudController;
use Backpack\CRUD\app\Library\CrudPanel\CrudPanelFacade as CRUD;

/**
 * Class BankCrudController
 * @package App\Http\Controllers\Admin
 * @property-read \Backpack\CRUD\app\Library\CrudPanel\CrudPanel $crud
 */
class BankCrudController extends CrudController
{
    use \Backpack\CRUD\app\Http\Controllers\Operations\ListOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\CreateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\UpdateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\DeleteOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\ShowOperation;

    /**
     * Configure the CrudPanel object. Apply settings to all operations.
     *
     * @return void
     */
    public function setup()
    {
        CRUD::setModel(\App\Models\Bank::class);
        CRUD::setRoute(config('backpack.base.route_prefix') . '/bank');
        CRUD::setEntityNameStrings('bank', 'banks');
    }

    /**
     * Define what happens when the List operation is loaded.
     *
     * @see  https://backpackforlaravel.com/docs/crud-operation-list-entries
     * @return void
     */
    protected function setupListOperation()
    {
        $this->crud->column('name')->type('string');
        $this->crud->column('url')->type('string');
        $this->crud->column('survey_url')->label('Surver URL')->type('string');
        $this->crud->addColumn([
            'name' => 'user_id',
            'entity' => 'user',
            'model' => User::class,
            'attribute' => 'name',
            'multiple' => false,
            'pivot' => false,
        ]);
        /**
         * Columns can be defined using the fluent syntax or array syntax:
         * - CRUD::column('price')->type('number');
         * - CRUD::addColumn(['name' => 'price', 'type' => 'number']);
         */
    }

    /**
     * Define what happens when the Create operation is loaded.
     *
     * @see https://backpackforlaravel.com/docs/crud-operation-create
     * @return void
     */
    protected function setupCreateOperation()
    {
        CRUD::setValidation(BankRequest::class);

        $this->crud->addField([
            'name'=> 'name',
            'type' => 'text',
            'allows_null' => false
        ]);
        $this->crud->field('url')->type('url');
        $this->crud->field('survey_url')->label('Surver URL')->type('url');
        $this->crud->addField([
            'name' => 'user_id',
            'type' => 'select2',
            'entity' => 'user',
            'model' => User::class,
            'attribute' => 'name',
            'multiple' => false,
            'pivot' => false,
            'allows_null' => false
        ]);

        /**
         * Fields can be defined using the fluent syntax or array syntax:
         * - CRUD::field('price')->type('number');
         * - CRUD::addField(['name' => 'price', 'type' => 'number']));
         */
    }

    /**
     * Define what happens when the Update operation is loaded.
     *
     * @see https://backpackforlaravel.com/docs/crud-operation-update
     * @return void
     */
    protected function setupUpdateOperation()
    {
        $this->setupCreateOperation();
    }

    protected function setupShowOperation() {
        $this->crud->column('url')->type('string');
        $this->crud->column('name');
        $this->crud->addColumn([
            'name' => 'user_id',
            'entity' => 'user',
            'model' => User::class,
            'attribute' => 'name',
            'multiple' => false,
            'pivot' => false,
        ]);
    }
}
