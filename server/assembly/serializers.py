from rest_framework import serializers
from .models import Law

class LawSerializer(serializers.ModelSerializer):
    class Meta:
        model = Law
        fields = [
            'law_id',
            'bill_name',
            'bill_no',
            'committee_name',
            'propose_dt',
            'proc_dt',
            'law_dislike',
            'law_like',
            'law_pdf',
            'law_pass',
            'law_summary',
            'main_lawmaker',
            'sum_lawmaker',
            'proposal_kind',
        ]
