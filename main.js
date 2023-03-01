const $div = document.getElementById('content')
const $input = document.getElementById('input')
let arrDeObjeto = []
let id
let tarefa = ''
let tarefasSalvas = JSON.parse(localStorage.getItem('tarefas'))  || []

tarefasSalvas.forEach((data)=>{
	$div.insertAdjacentHTML('beforeend', data.nomeDaTarefa)
})

function enviarItem(){
		id = Date.now()
		arrDeObjeto.push({tarefa: $input.value, id:id})
		preencherDiv()
		$input.value = ''
}

function preencherDiv(){
	arrDeObjeto.forEach((nomes)=>{   
		const descricaoTarefas = nomes.tarefa
		tarefa = `<p class="tarefa" data-id="${id}">${descricaoTarefas}<button class="btn-delete">X</button></p>`
	})
	console.log(tarefa)
	tarefasSalvas.push({nomeDaTarefa: tarefa, id: id}) 
	localStorage.setItem('tarefas', JSON.stringify(tarefasSalvas))
	$div.insertAdjacentHTML('beforeend', tarefa)
}

$div.addEventListener('click', (e)=>{
	const elAlvo = e.target
	const btnDeleteClick = e.target.classList.contains('btn-delete')
	if(btnDeleteClick){
		const idTarefa = elAlvo.parentNode.getAttribute('data-id')
		filtro(idTarefa)
	}
	const paragrafoDeletar = elAlvo.parentNode
	paragrafoDeletar.remove()
})

function filtro(id){
	localStorage.clear()
	const TarefasAtualizada = arrDeObjeto.filter((tasks) => {
		return tasks.id !== Number(id)
	})

	const TarefasLocalStorage = tarefasSalvas.filter((tasks) => {
		return tasks.id !== Number(id)
	})

	arrDeObjeto = ""
	arrDeObjeto = TarefasAtualizada

	tarefasSalvas = ""
	tarefasSalvas = TarefasLocalStorage

	localStorage.setItem('tarefas', JSON.stringify(tarefasSalvas))
}

