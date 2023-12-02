function skillsMember() {
    var member = document.getElementById('member');
    var memberSkills = document.getElementById('member-skills');

    if (member.checked == true) {
        memberSkills.style.display = 'block';
    } else {
        memberSkills.style.display = 'none';
    }
}
