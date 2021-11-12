

function video(){
    const vi = document.getElementById("video1");
        vi.addEventListener('click', ()=>{
			if(vi.paused){
				vi.play();
			}
			else{
				vi.pause();
			}
		})
}

function openStore(){
	const store_ul = document.getElementById('store_ul');

	if(store_ul.style.display == 'block'){
		store_ul.style.display = 'none';
	}
	else{
		store_ul.style.display = 'block';
	}
}
function openCommunity(){
	const community_ul = document.getElementById('community_ul');

	if(community_ul.style.display == 'block'){
		community_ul.style.display = 'none';
	}
	else{
		community_ul.style.display = 'block';
	}
}


document.getElementById('store').addEventListener('click', openStore);
document.getElementById('community').addEventListener('click', openCommunity);
document.body.addEventListener('click', e =>{
	const search = document.getElementById('search');
	 if(e.target.id==="forSearch"){
		search.style.display = 'table';
        search.focus();
    }else if(e.target.id==="search" || e.target.id==="modalContainer"){
        search.style.display = 'table';
    }
});
document.getElementById('search').addEventListener('blur',()=>{
	search.style.display = 'none';
        search.value = "";
})
video();